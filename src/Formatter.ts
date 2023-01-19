export default {
  fromCamelCase(value: string): string {
   const withSpaces =  value.replace(/[A-Z]/, (s: string): string => { return ' ' + s })
   return withSpaces[0].toUpperCase() + withSpaces.substring(1) 
  },
}