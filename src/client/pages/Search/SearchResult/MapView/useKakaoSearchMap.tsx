import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from 'shared/components/styles/theme';
import useKakaoMapSDK from '@hooks/ui/useKakaoMapSDK';
import markerImage from '@assets/icons/map-marker.png';
import activeMarkerImage from '@assets/icons/active-map-marker.png';
import { Accommodation } from '@typings/response/accommodations';
import MapItemCard from '../MapItemCard';

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
  const overlayRef = useRef<typeof window.kakao.maps.CustomOverlay | null>(
    null,
  );
  const activeMarkerRef = useRef<typeof window.kakao.maps.Marker | null>(null);
  const defaultMarkerImageRef = useRef<
    typeof window.kakao.maps.MarkerImage | null
  >(null);
  const activeMarkerImageRef = useRef<
    typeof window.kakao.maps.MarkerImage | null
  >(null);

  useEffect(() => {
    if (!isLoaded || !window.kakao) return;
    const { kakao } = window;

    defaultMarkerImageRef.current = new kakao.maps.MarkerImage(
      markerImage,
      new kakao.maps.Size(20, 28),
    );

    activeMarkerImageRef.current = new kakao.maps.MarkerImage(
      activeMarkerImage,
      new kakao.maps.Size(20, 28),
    );
  }, [isLoaded]);

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
      overlayRef.current?.setMap(null);
      activeMarkerRef.current.setImage(defaultMarkerImageRef.current!);
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
        image: defaultMarkerImageRef.current!,
      });

      const container = document.createElement('div');
      container.style.position = 'relative';
      container.style.width = '280px';

      const root = createRoot(container);
      root.render(
        <ThemeProvider theme={theme}>
          <MapItemCard {...rest} onClickCard={onClickCard} />
        </ThemeProvider>,
      );

      const overlay = new kakao.maps.CustomOverlay({
        content: container,
        position,
        yAnchor: 1,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        overlayRef.current?.setMap(null);
        overlay.setMap(map);
        overlayRef.current = overlay;

        if (activeMarkerRef.current) {
          activeMarkerRef.current.setImage(defaultMarkerImageRef.current!);
        }

        if (activeMarkerRef.current !== marker) {
          marker.setImage(activeMarkerImageRef.current!);
          activeMarkerRef.current = marker;
        }

        map.panTo(position);
      });

      markerRef.current.push(marker);
    });

    if (accommodations.length > 0) map.setBounds(bounds);
  }, [accommodations]);
};

export default useKakaoSearchMap;
