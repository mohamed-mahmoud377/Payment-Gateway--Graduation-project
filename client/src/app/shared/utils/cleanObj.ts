import flatten from 'flat';
import { isNil, omit, omitBy } from 'lodash';

export function cleanObject(object: any, remove: string[] = []): any {
  /*
     Removing null-valued keys from an Object
  */
  const originalObject: any = flatten(object);
  let cleanedObject = omitBy(originalObject, (element) => {
    return isNil(element) || element === '';
  });

  if (remove.length) {
    cleanedObject = omit(cleanedObject, remove);
  }

  return flatten.unflatten(cleanedObject);
}
