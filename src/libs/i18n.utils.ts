/**
 * Ownership:
 *  Copyright © DAITOKENTAKU PARTNERS CO.,LTD. All Rights Reserved.
 *
 * Purpose:
 *  Provide utility functions for internationalization (i18n) operations.
 *
 * Notes:
 *  - Supports dot notation for nested keys (e.g., 'common.button.submit')
 *  - Supports {0}, {1} format for arrays and {key} format for objects
 */
/**
 * Get nested property from object using dot notation
 * @param obj - The object to get property from
 * @param key - The key path using dot notation (e.g., 'common.button.submit')
 * @returns The property value or undefined if not found
 */
export const getNestedProperty = (obj: Record<string, unknown>, key: string): unknown => {
  return key.split('.').reduce((acc: unknown, k: string) => {
    if (acc && typeof acc === 'object' && k in acc) {
      return (acc as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
};

/**
 * Replace placeholders in message string with arguments
 * Supports both array format ({0}, {1}) and object format ({key})
 * @param msg - The message string with placeholders
 * @param args - Arguments to replace placeholders (array or object)
 * @returns The message with replaced placeholders
 */
export const replaceArgs = (msg: string, args?: object | Array<string | number>): string => {
  if (!args) return msg;

  let result = msg;

  if (Array.isArray(args)) {
    // Replace {0}, {1}, {2}, etc. with array values
    args.forEach((arg, index) => {
      result = result.replace(new RegExp(`\\{${index}\\}`, 'g'), String(arg));
    });
  } else {
    // Replace {key} with object values
    Object.keys(args).forEach((argKey) => {
      result = result.replace(
        new RegExp(`\\{${argKey}\\}`, 'g'),
        String((args as Record<string, string | number>)[argKey]),
      );
    });
  }

  return result;
};
