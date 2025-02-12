import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString
} from 'nuqs/server';

export const commonSearchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString
};

// User search params
export const userSearchParams = {
  ...commonSearchParams,
  gender: parseAsString,
  status: parseAsString
};

export const userSearchParamsCache = createSearchParamsCache(userSearchParams);
export const userSearchParamsSerializer = createSerializer(userSearchParams);

// Product search params
export const productSearchParams = {
  ...commonSearchParams,
  categories: parseAsString,
  status: parseAsString
};

export const productSearchParamsCache =
  createSearchParamsCache(productSearchParams);
export const productSearchParamsSerializer =
  createSerializer(productSearchParams);
