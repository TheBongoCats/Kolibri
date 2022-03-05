import styles from './Docs.module.scss';

const titleConfig = [
  { title: 'general', subTitle: ['Intro', 'Founds', 'The Peg'] },
  { title: 'security', subTitle: ['Risks', 'Security Audit'] },
];

const Docs = () => {
  return (
    <div className={styles.docs}>
      <h1>Documentation</h1>
      <div>
        <ul>
          {titleConfig.map((titleItem) => {
            const { title, subTitle } = titleItem;

            return (
              <li key={title}>
                {title}
                <ul>
                  {subTitle.map((subTitleItem) => (
                    <li key={subTitleItem}>{subTitleItem}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Docs;
