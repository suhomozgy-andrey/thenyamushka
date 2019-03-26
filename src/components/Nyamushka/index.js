import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { nyamushkaBorder, packsColors } from '../../helpers';
import catBg from '../../cat.png';

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
    const color = selected ? 'rose' : (!available ? 'grey' : 'blue');
    return (
      <StyledNyamushka
        className={`${!available ? ' disabled' : ''}${hoverable ? ' hoverable' : ''}`}
        onMouseLeave={() => this.handleMouseLeave()}
        onMouseEnter={() => this.handleMouseOver()}
        color={color}
      >
        <StyledNyamushkaPack onClick={() => this.handleSelect()}>
          <StyledNyamushkaPackInner>
            <StyledNyamushkaPackInnerContent>
              <StyledNyamushkaPackCat src={catBg} alt={`Нямушка ${withProduct}`} />
              <StyledNyamushkaPackInnerContentText>
                <StyledNyamushkaPackHead color={hoverable && selected && hovered ? 'rose' : undefined}>
                  {hoverable && selected && hovered ? 'Котэ не одобряет?' : 'Сказочное заморское яство'}
                </StyledNyamushkaPackHead>
                <StyledNyamushkaPackTitle><strong>Нямушка</strong></StyledNyamushkaPackTitle>
                <StyledNyamushkaPackСonsist><strong>{withProduct}</strong></StyledNyamushkaPackСonsist>
                <StyledNyamushkaPackPortions>{portions} порций</StyledNyamushkaPackPortions>
                <StyledNyamushkaPackPresent>{present}</StyledNyamushkaPackPresent>
              </StyledNyamushkaPackInnerContentText>
            </StyledNyamushkaPackInnerContent>
            <StyledNyamushkaPackWeight>{weight} <span>{weightPostfix}</span></StyledNyamushkaPackWeight>
          </StyledNyamushkaPackInner>
        </StyledNyamushkaPack>
        <StyledNyamushkaUnderText>
          {!available ? (
            `Печалька, ${withProduct} закончился.`
          ) : (
              <Fragment>
                {selected ? (
                  underText
                ) : (
                    <Fragment>
                      Чего сидишь? Порадуй котэ, <StyledNyamushkaUnderTextAction onClick={() => this.handleSelect()}>купи</StyledNyamushkaUnderTextAction>
                    </Fragment>
                  )}

              </Fragment>
            )}
        </StyledNyamushkaUnderText>

      </StyledNyamushka>
    );
  }
}

const StyledNyamushkaPack = styled.div`
  height: 480px;
  border-radius: 12px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-size: 122%;
  background-position: -41px 206%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    transition: .2s background-image;
    background-position: 0 0;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const StyledNyamushkaPackHead = styled.div`
  color: ${props => props.color ? packsColors[props.color].hovered : '#666666'};
  font-size: 16px;
`;

const StyledNyamushkaPackCat = styled.img`
  position: absolute;
  left: -27px;
  bottom: -93px;
  height: 360px;
`;


const StyledNyamushkaPackInnerContentText = styled.div`
 padding: 20px 10px 20px 50px;
`;

const StyledNyamushkaPackTitle = styled.div`
  font-size: 48px;
`;

const StyledNyamushkaPackСonsist = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
`;

const StyledNyamushkaPackPortions = styled.div`
  color: #666666;
  font-size: 14px;
`;

const StyledNyamushkaPackPresent = styled.div`
  color: #666666;
  font-size: 14px;
`;

const StyledNyamushkaPackWeight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 3;
  right: 12px;
  bottom: 12px;
  color: #ffffff;
  font-size: 42px;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  transition: .2s background-color;
  & span {
    font-size: 21px;
    margin-top: -7px;
  }
`;

const StyledNyamushkaPackInner = styled.div`
  border: 4px solid transparent;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
`;

const StyledNyamushkaPackInnerContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
`;

const StyledNyamushkaUnderText = styled.div`
  font-size: 13px;
  text-align: center;
  color: #ffffff;
`;


const StyledNyamushkaUnderTextAction = styled.span`
  text-decoration: none;
  border-bottom: 1px dashed;
  cursor: pointer;
  transition: .2s color;
`;

const StyledNyamushka = styled.div`
  width: 320px;
  height: 509px;
  margin-bottom: 30px;
  max-width: 100%;
  &:not(:last-child) {
    margin-right: 80px;
  }

  @media (max-width: 860px) {
    margin-right: 0;
    &:not(:last-child) {
      margin-right: 0px;
    }
  }

  ${StyledNyamushkaPack} {
    border-color: ${props => packsColors[props.color].normal};
    &::after {
      background-image: url("${props => nyamushkaBorder(packsColors[props.color].normal)}");
    }
  }
  ${StyledNyamushkaPackWeight}{
    background-color: ${props => packsColors[props.color].normal};
  }
  ${StyledNyamushkaUnderTextAction}{
      color:  ${props => packsColors[props.color].normal};
  }

  &.hoverable:hover {
    ${StyledNyamushkaPack} {
      border-color: ${props => packsColors[props.color].hovered};
      &:after {
        background-image: url("${props => nyamushkaBorder(packsColors[props.color].hovered)}");
      }
    }
    ${StyledNyamushkaPackWeight}{
      background: ${ props => packsColors[props.color].hovered};
    }
    ${StyledNyamushkaUnderTextAction}{
      color: ${ props => packsColors[props.color].hovered};
    }
  }
  &.disabled{
    ${StyledNyamushkaPack} {
      & ${StyledNyamushkaPackInnerContentText} *, & ${StyledNyamushkaPackCat} {
        opacity: 0.5;
      }
    }
    ${StyledNyamushkaUnderText} {
      color: #FFFF66;
    }
  }
`;

export default Nyamushka;
