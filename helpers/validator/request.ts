export const validateRequest = async (schema: any, content: Record<string, any>) => {
  try {
    const validatedContent = await schema.validate(content);
    if (validatedContent.error) throw validatedContent.error.details;

    return validatedContent.value;
  } catch (err: any) {
    throw err[0].message;
  }
};
