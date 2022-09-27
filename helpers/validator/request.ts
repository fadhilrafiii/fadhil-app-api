import { ObjectSchema } from 'joi';

import { ErrorResponse } from 'helpers/response';

export const validateRequest = async <T>(schema: ObjectSchema, content: T): Promise<T> => {
  try {
    const validatedContent = await schema.validate(content);
    if (validatedContent.error) throw validatedContent.error.details[0].message;

    return validatedContent.value;
  } catch (error: unknown) {
    throw new ErrorResponse(error as string, 422);
  }
};
