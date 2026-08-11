import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

interface LoaderProps {
  fullScreen?: boolean;
}

const Loader = ({ fullScreen = true }: LoaderProps) => {
  return (
    <div className={fullScreen ? css.overlay : css.inline}>
      <ThreeDots visible height="60" width="60" color="#649179" radius="9" ariaLabel="loading" />
    </div>
  );
};

export default Loader;