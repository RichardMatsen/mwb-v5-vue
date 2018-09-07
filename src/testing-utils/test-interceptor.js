import config from '../../static/data/migration-workbench.config.json'
import riTreeData from '../../static/data/RITree/data.json'
import riTreeStructure from '../../static/data/RITree/structure.json'

const initialMeasures = {
  "measures": [
    { "id": "validations", "title": "Code Validations", "icon": "fa-check-square-o", "link": "validations",
      "metric": "0", "color": "grey", 
      "narrative": "Code Validation..." 
    },
  ]
}
const filelist = [
  'Clinics DB3 (01 Jun 2016 - 11.00).html',
  'Clinics DB3 (03 Jun 2016 - 11.00).html',
  'Clinics DB3 (26 May 2016 - 11.00).html',
  'Volatile Validations 06 Jun 2016.html',
  'Volatile Validations 09 Jun 2016 - 10.05.html',
  'Volatile Validations 09 Jun 2016 - 12.10.html',
  'Volatile Validations 09 Jun 2016 - 17.50.html'
].join('\n')
const users = [
  { firstName: 'John', lastName: 'Johnson', password: 'abc' },
  { firstName: 'Fred', lastName: 'Fellows', password: 'def' }
]

let willFail = false;

const interceptor = (request, next) => {
  if (request.url === 'migration-workbench.config.json') {
    next( request.respondWith( config, {status: 200} ));
  }
  if (request.url === 'InitialMeasures.json') {
    next( request.respondWith( JSON.stringify(initialMeasures), {status: 200} ));
  }
  if (request.url === 'filelist.txt') {
    if (!willFail) {
      next( request.respondWith( filelist, {status: 200} ));
    } else {
      next( request.respondWith( {error: 'some error'}, {status: 404} ));
    }
  }
  if (request.url === '/static/data/RITree/structure.json') {
    next( request.respondWith( '', {status: 200} ));
  }
  if (request.url.substring(0,7) === 'Clinics') {
    if (!willFail) {
      next( request.respondWith( 'some Clinics content', {status: 200} ));
    } else {
      next( request.respondWith( {error: 'some error'}, {status: 404} ));
    }
  }
  if (request.url.substring(0,20) === 'Volatile Validations') {
    next( request.respondWith( 'some Validations content', {status: 200} ));
  }
  if (request.url === 'users.json') {
    next( request.respondWith( JSON.stringify(users), {status: 200} ));
  }
  if (request.url === '/static/data/RITree/data.json') {
    next( request.respondWith( JSON.stringify(riTreeData), {status: 200} ));
  }
  if (request.url === '/static/data/RITree/structure.json') {
    next( request.respondWith( JSON.stringify(riTreeStructure), {status: 200} ));
  }
}

const setFail = () => {
  willFail = true
}

const resetFail = () => {
  willFail = false
}

export {
  config,
  initialMeasures,
  interceptor,
  setFail,
  resetFail
}
