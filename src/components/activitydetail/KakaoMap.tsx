'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Location from '../../../public/icons/icon-location.svg';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  address: string;
}

const KakaoMap = ({ address }: KakaoMapProps) => {
  useEffect(() => {
    const loadKakaoMapScript = () => {
      // script를 만들어서 추가
      const kakaoMapScript = document.createElement('script');
      kakaoMapScript.async = true;
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services&autoload=false`;

      document.head.appendChild(kakaoMapScript);

      kakaoMapScript.onload = () => {
        window.kakao.maps.load(() => {
          // 지도를 표시할 div
          const mapContainer = document.getElementById('map');
          const mapOptions = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(mapContainer, mapOptions);

          // 주소-좌표 변환 객체를 생성
          const geocoder = new window.kakao.maps.services.Geocoder();

          // 주소로 좌표를 검색
          geocoder.addressSearch(address, function (result: any, status: any) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              // 결과값으로 받은 위치를 마커로 표시
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 지도의 중심을 결과값으로 받은 위치로 이동
              map.setCenter(coords);
            }
          });
        });
      };
    };

    loadKakaoMapScript();
  }, [address]);

  return (
    <div>
      <div
        id="map"
        className="w-full lg:w-max-[790px] lg:h-[450px] md:w-max-[450px] md:h-[276px] w-max-[327px] h-[450px] rounded-[16px] overflow-hidden"
      />
      <span className="mt-[8px] gap-[2px] flex items-center text-md text-nomad-black">
        <Image src={Location} alt="위치" width={18} height={18} />
        {address}
      </span>
    </div>
  );
};

export default KakaoMap;
