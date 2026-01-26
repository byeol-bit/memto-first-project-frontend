import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk'

const useKakaoLoader = () => {
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY

  const { loading, error } = useKakaoLoaderOrigin({
    appkey: apiKey || '',
    libraries: ["clusterer", "drawing", "services"],
  });

  return { loading, error };
};

export default useKakaoLoader