export default {
  fromCamelCase(value: string): string {
   const withSpaces =  value.replace(/[A-Z]/g, (s: string): string => { return ' ' + s })
   return withSpaces[0].toUpperCase() + withSpaces.substring(1) 
  },
}