import * as React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { gravatarUrl } from "gravatar-url";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/user";

export const NavigationBar = ({ user, logout }) => {
  return (
    <div>
      <Menu>
        <Menu.Item as={Link} to="/dashboard">
          Dashboard
        </Menu.Item>

        <Menu.Menu position="right">
          <Dropdown trigger={<Image avatar />}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { logout })(NavigationBar);
