import { diffWords } from 'diff';
import './DiffChecker.css';

const DiffChecker = ({ oldText, newText, classType }) => {
  const diff = diffWords(oldText, newText);

  return (
    <div className={classType}>
      {diff.map((part, index) => {
        let className = 'defaultText';

        if (part.added) {
          className = 'addition';
        } else if (part.removed) {
          className = 'removal';
        }

        return (
          <span key={index} className={className}>
            {part.value}
          </span>
        );
      })}
    </div>
  );
};

export default DiffChecker;
