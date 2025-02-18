type Props = { pageParam?: number };

export async function getMyActivities({ pageParam }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/my-activities?cursor=${pageParam}`,
    {
      next: {
        tags: ['my-activities'],
      },
      cache: 'no-store',
      /** 추후에 토큰 넣을예정 */
      headers: {},
    }
  );

  if (!res.ok) {
    throw new Error('어흥');
  }

  return res.json();
}
