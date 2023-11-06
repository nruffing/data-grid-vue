import { FilterOperator } from 'data-grid-vue'
import { DataType, Field, type Column } from 'data-grid-vue'

interface DemoDataItem {
  id: number
  firstName: string
  lastName: string
  email?: string
  ipAddress?: string
}

const columns = [
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.greaterThanOrEqualTo],
    },
    width: '10%',
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.contains],
    },
    width: '*',
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.contains],
    },
    width: '*',
  },
  {
    field: new Field('email'),
    dataType: DataType.alphanumeric,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.contains],
    },
    width: '2*',
  },
] as Column[]

const data = [
  { id: 1, firstName: 'Kaleb', lastName: 'Ianizzi', email: 'kianizzi0@people.com.cn', ipAddress: '97.89.156.196' },
  { id: 2, firstName: 'Charlotta', lastName: 'Lippingwell', email: 'clippingwell1@hexun.com', ipAddress: '200.86.86.11' },
  { id: 3, firstName: 'Osmond', lastName: 'Covil', email: 'ocovil2@joomla.org', ipAddress: '183.99.238.133' },
  { id: 4, firstName: 'Cad', lastName: 'Plumbley', email: 'cplumbley3@baidu.com', ipAddress: '3.40.67.142' },
  { id: 5, firstName: 'Raff', lastName: 'Riba', email: 'rriba4@arstechnica.com', ipAddress: '242.168.252.28' },
  { id: 6, firstName: 'Algernon', lastName: 'Choffin', email: 'achoffin5@e-recht24.de', ipAddress: '240.71.239.63' },
  { id: 7, firstName: 'Lucias', lastName: 'Fernley', email: 'lfernley6@who.int', ipAddress: '232.117.110.69' },
  { id: 8, firstName: 'Chastity', lastName: 'Stockey', email: 'cstockey7@miitbeian.gov.cn', ipAddress: '72.162.180.25' },
  { id: 9, firstName: 'Marilyn', lastName: 'Harriman', email: 'mharriman8@diigo.com', ipAddress: '111.74.249.165' },
  { id: 10, firstName: 'Ag', lastName: 'Jacmar', email: 'ajacmar9@yale.edu', ipAddress: '21.137.23.5' },
  { id: 11, firstName: 'Easter', lastName: 'Diggles', email: 'edigglesa@usatoday.com', ipAddress: '136.219.26.132' },
  { id: 12, firstName: 'Moe', lastName: 'Maynard', email: 'mmaynardb@scribd.com', ipAddress: '104.9.24.131' },
  { id: 13, firstName: 'Izaak', lastName: 'Casino', email: 'icasinoc@china.com.cn', ipAddress: '223.189.85.213' },
  { id: 14, firstName: 'Halli', lastName: 'Kondratenya', email: 'hkondratenyad@scientificamerican.com', ipAddress: '143.83.39.53' },
  { id: 15, firstName: 'Noemi', lastName: 'Dunridge', email: 'ndunridgee@seesaa.net', ipAddress: '44.143.125.138' },
  { id: 16, firstName: 'Tore', lastName: 'Haldenby', email: 'thaldenbyf@oaic.gov.au', ipAddress: '120.12.212.116' },
  { id: 17, firstName: 'Latrena', lastName: 'Spincke', email: 'lspinckeg@cdbaby.com', ipAddress: '252.189.60.16' },
  { id: 18, firstName: 'Alberto', lastName: 'Capnerhurst', email: 'acapnerhursth@europa.eu', ipAddress: '113.73.138.35' },
  { id: 19, firstName: 'Cherice', lastName: 'Murcott', email: 'cmurcotti@jalbum.net', ipAddress: '66.248.38.83' },
  { id: 20, firstName: 'Andreana', lastName: 'Withringten', email: 'awithringtenj@canalblog.com', ipAddress: '109.224.196.216' },
  { id: 21, firstName: 'Rogerio', lastName: 'Bernon', email: 'rbernonk@wunderground.com', ipAddress: '121.52.230.254' },
  { id: 22, firstName: 'Alonzo', lastName: 'McIvor', email: 'amcivorl@yandex.ru', ipAddress: '129.148.82.120' },
  { id: 23, firstName: 'Vanya', lastName: 'Venney', email: undefined, gender: undefined, ipAddress: '142.52.129.30' },
  { id: 24, firstName: 'Delmer', lastName: 'McOrkill', email: 'dmcorkilln@ustream.tv', ipAddress: '134.237.135.65' },
  { id: 25, firstName: 'Kennie', lastName: 'Havers', email: 'khaverso@cnn.com', gender: 'Genderqueer', ipAddress: '206.233.151.111' },
  { id: 26, firstName: 'Gwynne', lastName: 'Breakey', email: 'gbreakeyp@boston.com', ipAddress: '190.28.78.249' },
  { id: 27, firstName: 'Gilburt', lastName: 'Longmate', email: 'glongmateq@quantcast.com', ipAddress: '14.186.15.209' },
  { id: 28, firstName: 'Milty', lastName: 'Reiach', email: 'mreiachr@gmpg.org', ipAddress: '70.100.231.149' },
  { id: 29, firstName: 'Sella', lastName: 'Drewry', email: 'sdrewrys@bravesites.com', ipAddress: '151.95.192.177' },
  { id: 30, firstName: 'Mannie', lastName: 'Raynor', email: 'mraynort@linkedin.com', ipAddress: undefined },
  { id: 31, firstName: 'Torie', lastName: 'Georger', email: 'tgeorgeru@archive.org', gender: 'Non-binary', ipAddress: '169.170.92.131' },
  { id: 32, firstName: 'Maxy', lastName: 'Kelsow', email: 'mkelsowv@g.co', ipAddress: '63.46.117.182' },
  { id: 33, firstName: 'Rozalie', lastName: 'Rodbourne', email: 'rrodbournew@dell.com', ipAddress: undefined },
  { id: 34, firstName: 'Rosy', lastName: 'Darville', email: 'rdarvillex@wix.com', ipAddress: '185.181.209.131' },
  { id: 35, firstName: 'Jarib', lastName: 'Yanshinov', email: 'jyanshinovy@etsy.com', ipAddress: '225.102.233.63' },
  { id: 36, firstName: 'Umeko', lastName: 'Palumbo', email: 'upalumboz@unc.edu', ipAddress: '110.26.18.215' },
  { id: 37, firstName: 'Phip', lastName: 'Weekley', email: 'pweekley10@comsenz.com', ipAddress: '234.39.36.195' },
  { id: 38, firstName: 'Willie', lastName: 'Northidge', email: 'wnorthidge11@illinois.edu', ipAddress: '137.233.222.227' },
  { id: 39, firstName: 'Denise', lastName: 'Sibille', email: 'dsibille12@webmd.com', ipAddress: undefined },
  { id: 40, firstName: 'Lilllie', lastName: 'Grocock', email: 'lgrocock13@theglobeandmail.com', gender: 'Bigender', ipAddress: '134.177.237.167' },
] as DemoDataItem[]

export default {
  columns,
  data,
}
