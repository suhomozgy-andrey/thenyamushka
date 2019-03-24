import React, { Component } from 'react';
import catBg from '../../cat.png';
// import border from '../../nyamushka_border.svg';

class Nyamushka extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
      clicked: 0,
      hoverable: false,
      leavesCount: 0,
    }
  }

  componentWillMount() {
    const { selected } = this.props;

    this.setState({
      hoverable: selected
    })
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = nextProps;
    const { leavesCount, clicked } = this.state;
    this.setState({
      hoverable: (clicked > 0 && leavesCount > 0) && !selected
    })
  }

  handleMouseOver() {
    const { clicked, leavesCount } = this.state;
    const { selected } = this.props;
    this.setState({
      hovered: true,
      hoverable: (clicked > 0 && leavesCount > 0) || selected
    })
  }

  handleSelect() {
    const { clicked, hoverable } = this.state;
    const { id, available, selected, onPackSelect } = this.props;
    if (!available) return false;
    this.setState({
      clicked: clicked + 1,
      hoverable: selected ? false : hoverable,
    })
    onPackSelect(id);
  }

  handleMouseLeave() {
    const { leavesCount } = this.state;
    this.setState({
      hovered: false,
      leavesCount: leavesCount + 1,
    })
  }

  render() {
    const { hovered, hoverable } = this.state;
    const { with: withProduct, selected, portions, present, weight, weightPostfix, underText, available } = this.props;
    const color = selected ? 'rose' : (!available ? '' : 'blue');
    return (
      <div className={`nyamushka ${color}${!available ? ' disabled' : ''}${hoverable ? ' hoverable' : ''}`} onMouseLeave={() => this.handleMouseLeave()} onMouseEnter={() => this.handleMouseOver()}>
        <div className="nyamushka__pack" onClick={() => this.handleSelect()}>
          <img src={catBg} className="nyamushka__pack__bg" alt={`Нямушка ${withProduct}`} />
          <div className="nyamushka__pack__content">
            <span className={`nyamushka__pack__head ${(hoverable && selected && hovered) ? 'rose' : ''}`}>
              {hoverable && selected && hovered ? 'Котэ не одобряет?' : 'Сказочное заморское яство'}
            </span>
            <div className="nyamushka__pack__title"><strong>Нямушка</strong></div>
            <div className="nyamushka__pack__with"><strong>{withProduct}</strong></div>
            <div className="nyamushka__pack__portions">{portions} порций</div>
            <div className="nyamushka__pack__present">{present}</div>
          </div>
          <div className="nyamushka__pack__weight">{weight} <span>{weightPostfix}</span></div>
        </div>
        {!available ? (
          <div className="nyamushka__undertest">
            <div>Печалька, {withProduct} закончился.</div>
          </div>
        ) : (
            <div className="nyamushka__undertest">
              {selected ? (
                <div>{underText}</div>
              ) : (
                  <div>Чего сидишь? Порадуй котэ, <span className="nyamushka__undertest__select" onClick={() => this.handleSelect()}>купи</span></div>
                )}

            </div>
          )}
      </div>
    );
  }
}

export default Nyamushka;
