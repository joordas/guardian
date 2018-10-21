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
      updateList(GUARDIAN_LIST, list);
    }
    this.setState({ list });
  }

  render() {
    const { list } = this.state;
    return (
      <Wrapper>
        <Fragment>
          <List>
            {list.sort(item => item.checked).map((item, index) => {
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
          </List>
          <form onSubmit={e => this.handleSubmit(e)}>
            <Input
              type="text"
              value={this.state.input}
              onChange={e => this.handleChange(e)}
            />
            <button type={'submit'}>manda</button>
          </form>
        </Fragment>
      </Wrapper>
    );
  }
}
const Wrapper = styled.div`
  height: 100%;
  flex: 1;
`;

const ListItem = ({ item, checked }) => (
  <Item checked={checked}>{item.title}</Item>
);

const Delete = styled.button`
  background-color: white;
  border: none;
  color: dodgerblue;
  border-radius: 8px;
  border: 1px solid dodgerblue;
  &:hover {
    color: white;
    background-color: dodgerblue;
  }
`;
const Check = styled.button`
  background-color: white;
  border: none;
  color: dodgerblue;
  border-radius: 8px;
  border: 1px solid dodgerblue;
  &:hover {
    color: white;
    background-color: dodgerblue;
  }
`;

const Item = styled.li`
  text-decoration: ${({ checked }) =>
    checked ? 'line-through' : 'none'};
  transition-duration: 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  &:hover {
    background-color: lightgrey;
  }
`;

const Fragment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
`;

const List = styled.ul`
  padding: 0;
`;

const Input = styled.input`
  border-radius: 4px;
  outline: none;
  border: none;
  border: 1px solid dodgerblue;
  -webkit-appearance: none;
`;

export default CheckList;
