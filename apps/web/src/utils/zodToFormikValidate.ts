import type { ZodType } from 'zod';

/**
 * Adapts a shared zod schema (also used for server-side validation, see
 * @manegio/shared) into the shape Formik's `validate` prop expects: a
 * (possibly nested) object of field name -> error message.
 */
export function zodToFormikValidate<T>(schema: ZodType<T>) {
  return (values: T): Record<string, string> => {
    const result = schema.safeParse(values);
    if (result.success) return {};

    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join('.');
      if (!errors[path]) {
        errors[path] = issue.message;
      }
    }
    return errors;
  };
}
