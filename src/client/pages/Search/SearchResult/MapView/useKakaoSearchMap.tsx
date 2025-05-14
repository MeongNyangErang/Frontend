import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from 'shared/components/styles/theme';
import useKakaoMapSDK from '@hooks/ui/useKakaoMapSDK';
import markerImage from '@assets/icons/map-marker.png';
import { Accommodation } from '@typings/response/accommodations';
import SearchItemCard from '../SearchItemCard';

interface UseKakaoSearchMapProps {
  mapContainer: HTMLDivElement | null;
  accommodations: Accommodation[];
  onClickCard: (accommodationId: number) => void;
}

const useKakaoSearchMap = ({
  mapContainer,
  accommodations,
  onClickCard,
}: UseKakaoSearchMapProps) => {
  const isLoaded = useKakaoMapSDK();
  const mapRef = useRef<typeof window.kakao.maps.Map | null>(null);
  const markerRef = useRef<(typeof window.kakao.maps.Marker)[]>([]);
  const infoWindowRef = useRef<typeof window.kakao.maps.InfoWindow | null>(
    null,
  );

  useEffect(() => {
    if (!isLoaded || !mapContainer || !window.kakao) return;
    const { kakao } = window;

    if (!mapRef.current) {
      mapRef.current = new kakao.maps.Map(mapContainer, {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 5,
      });
    }

    kakao.maps.event.addListener(mapRef.current, 'click', () => {
      infoWindowRef.current?.close();
    });
  }, [isLoaded, mapContainer]);

  useEffect(() => {
    if (!isLoaded || !window.kakao || !mapRef.current) return;

    const { kakao } = window;
    const map = mapRef.current;

    markerRef.current.forEach((marker) => marker.setMap(null));
    markerRef.current = [];

    const bounds = new kakao.maps.LatLngBounds();

    accommodations.forEach(({ latitude, longitude, ...rest }) => {
      const position = new kakao.maps.LatLng(latitude, longitude);
      bounds.extend(position);

      const marker = new kakao.maps.Marker({
        map,
        position,
        image: new kakao.maps.MarkerImage(
          markerImage,
          new kakao.maps.Size(20, 28),
        ),
      });

      const container = document.createElement('div');
      const root = createRoot(container);

      root.render(
        <ThemeProvider theme={theme}>
          <SearchItemCard {...rest} onClickCard={onClickCard} />
        </ThemeProvider>,
      );

      const infoWindow = new kakao.maps.InfoWindow({
        content: container,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        infoWindowRef.current?.close();
        infoWindow.open(map, marker);
        infoWindowRef.current = infoWindow;
      });

      markerRef.current.push(marker);
    });

    if (accommodations.length > 0) map.setBounds(bounds);
  }, [accommodations]);
};

export default useKakaoSearchMap;
