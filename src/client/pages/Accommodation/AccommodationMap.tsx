import { useEffect } from 'react';
import styled from 'styled-components';

interface AccommodationMapProps {
  longitude: number;
  latitude: number;
}

const AccommodationMap = ({ longitude, latitude }: AccommodationMapProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const map = new window.kakao.maps.Map(document.getElementById('map'), {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        });

        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(latitude, longitude),
          map,
        });
      });
    };
  }, []);

  return (
    <SMapWrap>
      <div id="map" style={{ width: '100%', height: '300px' }} />
    </SMapWrap>
  );
};

export default AccommodationMap;
const SMapWrap = styled.div`
  margin: 12px 0 16px;
  border-radius: 8px;
  overflow: hidden;
`;
