import React from 'react';
import { Button } from 'reactstrap';
import Menu from '@material-ui/core/Menu';
import MyPDFDocument from './MyPDFDocument';
import './SimpleMenu.css';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className='btn-group special'>
        <Button color='primary' onClick={this.handleClick}>
          {this.props.name}
        </Button>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MyPDFDocument
            pages={this.props.pages}
            testKey={this.props.test}
            file={this.props.file}
          />
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
