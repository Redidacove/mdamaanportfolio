
interface ScrollProgressProps {
  progress: number;
}

const ScrollProgress = ({ progress }: ScrollProgressProps) => {
  return (
    <div 
      className="scroll-progress"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  );
};

export default ScrollProgress;
