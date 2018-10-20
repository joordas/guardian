import React, { Component } from 'react';
import styled from 'styled-components';

const GUARDIAN_LIST = 'GUARDIAN_LIST';

const updateList = (key, list) => {
  localStorage.setItem(key, JSON.stringify(list));
};

class CheckList extends Component {
  state = {
    list: [],
    input: ''
  };

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  deleteItem = key => {
    const list = this.state.list.filter(item => item.key !== key);
    updateList(GUARDIAN_LIST, list);
    this.setState({ list });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.input.length) return;
    const item = {
      title: this.state.input,
      checked: false,
      key: Date.now()
    };

    const list = [item, ...this.state.list];
    updateList(GUARDIAN_LIST, list);

    this.setState({
      list,
      input: ''
    });
  };

  checkItem = key => {
    const list = this.state.list.reduce((acc, current) => {
      if (current.key === key) {
        acc.push({ ...current, checked: !current.checked });
      } else {
        acc.push(current);
      }
      return acc;
    }, []);
    // const list = [item, ...this.state.list];
    updateList(GUARDIAN_LIST, list);
    this.setState({ list });
  };

  componentDidMount() {
    let list;
    try {
      list = JSON.parse(localStorage.getItem(GUARDIAN_LIST));
    } catch (e) {
      list = [];
    }
    this.setState({ list });
  }

  render() {
    const { list } = this.state;
    return (
      <>
        {list.map((item, index) => {
          return (
            <Item key={item.key} checked={item.checked}>
              <Check onClick={() => this.checkItem(item.key)}>
                check
              </Check>
              {item.title}
              <Delete onClick={() => this.deleteItem(item.key)}>
                x
              </Delete>
            </Item>
          );
        })}
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            value={this.state.input}
            onChange={e => this.handleChange(e)}
          />
          <button type={'submit'}>manda</button>
        </form>
      </>
    );
  }
}

const ListItem = ({ item, checked }) => (
  <Item checked={checked}>{item.title}</Item>
);

const Delete = styled.button``;
const Check = styled.button``;

const Item = styled.li`
  text-decoration: ${({ checked }) =>
    checked ? 'line-through' : 'none'};
  transition-duration: 0.2s;
  &:hover {
    background-color: lightgrey;
  }
`;

export default CheckList;
