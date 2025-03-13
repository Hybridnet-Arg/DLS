import * as React from 'react';

function ArticleIcon({ fill = '#6C7281', ...rest }) {
  return (
    <svg viewBox="0 0 15 15" width={24} height={24} fill="#6C7281">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 1.5A.5.5 0 01.5 1h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h10a.5.5 0 010 1h-10a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4 3A.5.5 0 01.5 7h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h10a.5.5 0 010 1h-10a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4 3a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h10a.5.5 0 010 1h-10a.5.5 0 01-.5-.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default ArticleIcon;
