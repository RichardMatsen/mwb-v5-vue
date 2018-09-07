import injector from 'vue-inject';

import ConfigService from '@/services/config.service'
import DataService from '@/services/data.service'
import MeasureService from '@/services/measure.service'

import FileService from '@/services/file.service'
import NameParsingService from '@/services/name-parsing.service'
import ListFormatterService from '@/services/list-formatter.service'
import filesByDateService from '@/services/files-by-date.service'

import HistoryService from './history.service'

injector.service('fileService', function() { return FileService });
injector.service('nameParsingService', function() { return NameParsingService });
injector.service('listFormatterService', function() { return ListFormatterService });
injector.service('filesByDateService', function() { return filesByDateService });

injector.service('historyService', function() { return HistoryService });

injector.service('configService', function() { return ConfigService });
injector.service('dataService', ['fileService', 'nameParsingService', 'listFormatterService', 'filesByDateService'], function() { return DataService });
injector.service('measureService', ['historyService'], function() { return MeasureService });
