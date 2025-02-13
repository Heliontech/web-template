import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Prisma } from '@pt/db';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Catch prisma ORM error
 * @param defaultMsg
 * @param err
 * @returns {IApiRes}
 */
export function catchORMError(defaultMsg: string, err?: unknown) {
  // type narrowing
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      meta: {
        code: 'ERROR',
        message: err.message
      }
    };
  }

  return {
    meta: {
      code: 'ERROR',
      message: defaultMsg
    }
  };
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
}

export function convertSortParams(sortOrder: string | null) {
  if (sortOrder === 'ascend') {
    return 'asc';
  } else if (sortOrder === 'descend') {
    return 'desc';
  }
}

export function convertSearchParamsToWhereClause(
  searchParams: URLSearchParams
) {
  // Parse the search parameters
  const search: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key.startsWith('search[') && key.endsWith(']')) {
      const fieldName = key.slice(7, -1); // Extract the field name between 'search[' and ']'
      search[fieldName] = value;
    }
  });

  const whereClause = Object.keys(search).reduce(
    (acc, key) => {
      acc[key] = {
        contains: search[key]
        // mode: "insensitive", // Optional: case-insensitive search
      };
      return acc;
    },
    {} as Record<string, any>
  );

  return whereClause;
}
