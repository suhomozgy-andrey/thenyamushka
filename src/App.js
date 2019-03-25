import React, { Component } from 'react';
import { Nyamushka } from './components';
import { immutableRowUpdateById } from './helpers';

const data = [
  {
    id: 1,
    with: 'с фуа-гра',
    portions: 10,
    present: 'мышь в подарок',
    weight: 0.5,
    weightPostfix: 'кг',
    available: true,
    underText: 'Головы щучьи с чесноком да свежайшая семгушка.',
  },
  {
    id: 2,
    with: 'с рыбой',
    portions: 40,
    present: '2 мыши в подарок',
    weight: 2,
    weightPostfix: 'кг',
    available: true,
    underText: 'Головы щучьи с чесноком да свежайшая семгушка.',
  },
  {
    id: 3,
    with: 'с курой',
    portions: 100,
    present: `5 мышей в подарок. Заказчик доволен`,
    weight: 5,
    weightPostfix: 'кг',
    available: false,
    underText: 'Чего сидишь? Порадуй котэ, ',
    underTextSelected: 'Головы щучьи с чесноком да свежайшая семгушка.',
  },
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nyamushki: data,
    }
  }

  handleSelectPack(packId) {
    const { nyamushki } = this.state;
    this.setState({
      nyamushki: immutableRowUpdateById(nyamushki, packId),
    })
  }

  render() {
    const { nyamushki } = this.state;
    return (
      <div className="nyamushki">
        <div className="nyamushki__title">
          Ты сегодня покормил кота?
        </div>
        <div className="nyamushki__list">
          {nyamushki.map((nyamushka) => (
            <Nyamushka key={nyamushka.id} {...nyamushka} onPackSelect={(id) => this.handleSelectPack(id)} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
