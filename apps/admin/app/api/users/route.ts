import {
  convertSearchParamsToWhereClause,
  convertSortParams
} from '@/lib/utils';
import { getUsers } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams,
    page = searchParams.get('page') || '1',
    pageSize = searchParams.get('limit') || '10',
    sortField = searchParams.get('sortField') || 'created_at',
    sortOrder = convertSortParams(searchParams.get('sortOrder')) || 'desc',
    whereClause = convertSearchParamsToWhereClause(searchParams);

  try {
    const result = await getUsers({
      page: parseInt(page, 10),
      pageSize: parseInt(pageSize, 10),
      search: whereClause,
      sortField,
      sortOrder
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { meta: { code: 'E500', message: err.message } },
      { status: 500 }
    );
  }
}
