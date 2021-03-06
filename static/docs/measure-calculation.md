# Measure Calculation

## Features

### Metrics

Metrics are calculated by scraping the HTML test result pages which are generated by the back-end Linq queries.
The purpose is to distill the tabular results down to a single figure, and add a traffic light colour.

![metrics](./images/metrics.jpg)  

In addition, the last 10 metrics are displayed in a sparkline to give a sense of the recent history.

![sparklines](./images/sparklines.jpg)  

### Working Set

We are generally interested in the latest working set of data (i.e those of the last few days). To reduce clutter and increase loading speed, the list is initially limited to a configured number of tests. Older results are accessed via a chevron at the bottom of the list.

![current working set](./images/clinics.jpg)

### Daily Reruns

Tests are often rerun on the same day once corrections have been made. Clusters are displayed by stepping the list (omitting the name) for the same test on the same day.

![stepped list](./images/validations.jpg)

## Data parsing

### Models

Both the file names and the contents are parsed for data. The file name gives the test type and date/time info. The content gives the metric data.

These are the key data models.

  ```ts
  export interface IFileInfo {
    name: String;              // Full file name
    namePrefix?: String;       // File type (match to prefix)
    baseName?: String;         // File name preceding date
    sequenceNo?: Number;       // Used to group daily re-runs
    displayName?: String;      // Truncated name for stepped display
    effectiveDate: Date;       // Test date (from filename)
    effectiveTime?: String;    // Test time (from filename)
    lastModified?: Date;       // File timestamp
    lastRefresh?: String;      // Last time file was read from disk 
    content?: String;          // File contents
    metric?: Number | String;  // Calculated metric
    badgeColor?: String;       // Colour from metric value
  }
  ```

  ```ts
  export interface IMeasure {
    id: String;
    title: String;
    metric?: Number | String;
    color?: String;
    icon?: String;
    link?: String;
    history?: Number[];
    narrative?: String;
  }
  ```

### Process steps

The `data.service` provides file processing, with the help of the following sub-services,

1. **File list fetching** (_file.service.ts_)  
   Invokes http.get to fetch the file list, and handles pending flag and saving of the list to Redux store.

2. **File name parsing** (_name-parsing.service.ts_)  
   Converts each file name into a FileInfo object, separating out date, time and test type.

3. **File sorting and sequencing** (_list-formatter.service.ts_)  
   Files are sorted by date, type and time. A sequence number is applied to files of the same date and type, to group repeat runs on the same day.

4. **Content is fetched and metric extracted** (_format.service.ts_ and derived classes)  
   The file itself is read (with FileService) and the metric value is extracted in a sub-class of FormatService.

### Service sub-classing

Each page has 90% identical data initialization, except for a few methods. Therefore, the bulk of the code is in an abstract base class **DataService** which has abstract methods for the parts that differ.  

For example, **ValidationsDataService**. Note that FormatService is also subclassed, so we pass the required type in the call to `super()`

```ts
@Injectable()
export abstract class DataService {

  public abstract config$: Observable<any>;
  public abstract files$: Observable<IFileInfo[]>;

  protected abstract PAGE: string;
  ...
  constructor (
    protected formatService: FormatService,
    protected nameParsingService: NameParsingService,
    protected listFormatterService: ListFormatterService,
    protected fileService: FileService,
    protected logger: Logger,
    protected pageActions: PageActions,
  ) {}

  protected abstract getLatestMeasureFromFiles(files: IFileInfo[]): IMeasureUpdate;
  protected abstract calcHistory(files: IFileInfo[]): number[];
}
```

```ts{10}
@Injectable()
export class ValidationsDataService extends DataService {

  @select(['config', 'validationsConfig']) config$: Observable<any>;
  @select(['pages', 'validations', 'files']) files$: Observable<IFileInfo[]>;

  protected PAGE = 'validations';
  ...
  constructor (
    protected formatService: ValidationsFormatService,
    protected nameParsingService: NameParsingService,
    protected listFormatterService: ListFormatterService,
    protected fileService: FileService,
    protected logger: Logger,
    protected store: StoreService
  ) {
    super(formatService, nameParsingService, listFormatterService, fileService, 
          logger, store.actions.validationsActions);
  }

  protected getLatestMeasureFromFiles(files: IFileInfo[]): IMeasureUpdate {
    ...
  }

  protected calcHistory(files): number[] {
    ...
}
```
