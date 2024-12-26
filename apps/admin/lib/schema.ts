import { z } from 'zod';

// Define a recursive schema for flexible JSON
const flexibleJsonSchema: any = z.lazy(() =>
  z.union([
    z.string(), // Allow string values
    z.number(), // Allow number values
    z.boolean(), // Allow boolean values
    z.null(), // Allow null values
    z.array(flexibleJsonSchema), // Allow arrays of JSON objects or values
    z.record(z.string(), flexibleJsonSchema) // Allow objects with string keys and flexible values
  ])
);

export const registerUserSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Invalid email'
    ),
  username: z
    .string()
    .regex(
      /^[a-z0-9_-]{3,15}$/g,
      'Username should be 3 to 15 characters long and consist only of lowercase letters, digits, underscores, or hyphens.'
    ),
  password: z.string().min(6, 'Password should be minimum 6 characters')
});
