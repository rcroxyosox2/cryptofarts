import * as styles from './styles';

const FooterNav = ({ leftNav, rightNav }) => {
  return (
    <styles.FooterNavStyle>
      <div>
        {leftNav}
      </div>
      <div>
        {rightNav}
      </div>
    </styles.FooterNavStyle>
  );
};

export default FooterNav;
