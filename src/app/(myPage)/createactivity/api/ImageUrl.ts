export async function ImageUrl(file: File, token: string | null) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(
    'https://sp-globalnomad-api.vercel.app/11-2/activities/image',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('이미지 업로드 실패!');
  }

  const data = await response.json();
  return data.activityImageUrl;
}
