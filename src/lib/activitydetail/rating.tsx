const rating = (averageRating: number) => {
  if (averageRating >= 4) {
    return '매우 만족';
  }
  if (averageRating >= 3.5 && averageRating < 4) {
    return '만족';
  }
  if (averageRating >= 3 && averageRating < 3.5) {
    return '보통';
  }
  if (averageRating >= 2.5 && averageRating < 3) {
    return '불만족';
  }
  if (averageRating < 2.5) {
    return '매우 불만족';
  }
  return null;
};

export default rating;
