type Props = {
  fullVPHeight?: boolean;
};

const LoadingScreen = ({ fullVPHeight }: Props) => (
  <div
    style={{
      display: 'grid',
      placeContent: 'center',
      height: '100%',
      ...(fullVPHeight ? { height: '100vh' } : {}),
    }}
  >
    Loading...
  </div>
);

export default LoadingScreen;
