import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import pluralize from 'pluralize-ru';
import { packsColors } from '../../helpers';
import catBg from '../../cat.png';

class Nyamushka extends Component {
  constructor(props) {
    super(props);
    const { selected } = props;
    this.state = {
      hovered: false,
      clicked: 0,
      hoverable: selected,
      leavesCount: 0,
    }
  }

  handleMouseOver() {
    const { clicked, leavesCount } = this.state;
    const { selected } = this.props;
    this.setState({
      hovered: true,
      hoverable: selected ? leavesCount > 0 : clicked > 0,
    })
  }

  handleSelect() {
    const { clicked, leavesCount } = this.state;
    const { id, available, onPackSelect, selected } = this.props;
    if (!available) return false;
    this.setState({
      clicked: clicked + 1,
      hoverable: selected ? false : clicked > 0 && leavesCount > 0,
      leavesCount: 0,
    })
    onPackSelect(id);
  }

  handleMouseLeave() {
    const { leavesCount } = this.state;
    const { selected } = this.props;
    this.setState({
      hovered: false,
      leavesCount: selected ? leavesCount + 1 : 0,
    })
  }

  render() {
    const { hovered, hoverable } = this.state;
    const { with: withProduct, selected, portions, presentCount, presentText, weight, weightPostfix, underText, available } = this.props;
    const color = selected ? packsColors.selected : (!available ? packsColors.disabled : packsColors.default);
    return (
      <StyledNyamushka
        className={`${!available ? ' disabled' : ''}${hoverable ? ' hoverable' : ''}`}
        onMouseLeave={() => this.handleMouseLeave()}
        onMouseEnter={() => this.handleMouseOver()}
        color={color}
      >
        <StyledNyamushkaPack onClick={() => this.handleSelect()}>
          <StyledNyamushkaPackInnerContent>
            <StyledNyamushkaPackCatBg><StyledNyamushkaPackCat src={catBg} alt={`Нямушка ${withProduct}`} /></StyledNyamushkaPackCatBg>
            <StyledNyamushkaPackInnerContentText >
              <StyledNyamushkaPackHead color={hoverable && selected && hovered ? packsColors.selected : undefined}>
                {hoverable && selected && hovered ? 'Котэ не одобряет?' : 'Сказочное заморское яство'}
              </StyledNyamushkaPackHead>
              <StyledNyamushkaPackTitle>
                <strong>Нямушка</strong>
              </StyledNyamushkaPackTitle>
              <StyledNyamushkaPackСonsist>
                <strong>{withProduct}</strong>
              </StyledNyamushkaPackСonsist>
              <StyledNyamushkaPackPortions>
                <strong>{portions}</strong> порций
              </StyledNyamushkaPackPortions>
              {presentCount && (
                <StyledNyamushkaPackPresent>
                  <strong>{presentCount}</strong> {pluralize(presentCount, '', 'мыш', 'мыши', 'мышей')} в подарок
                   <br />
                  {presentText}
                </StyledNyamushkaPackPresent>
              )}
            </StyledNyamushkaPackInnerContentText>
            <StyledNyamushkaPackWeight>
              {weight} <span>{weightPostfix}</span>
            </StyledNyamushkaPackWeight>
          </StyledNyamushkaPackInnerContent>

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
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &:after, &:before {
    content: '';
    background: #ffffff;
    cursor: pointer;
  }
  &:before {
    position: relative;
    right: 0;
    top: 0;
    width: calc(100% - 42px);
    height: 40px;
    align-self: flex-end;
    border: 4px solid;
    border-left: 0;
    border-bottom: 0;
    border-radius: 0 12px 0 0;
    z-index: 3;
  }
  &:after {
    position: absolute;
    left: 12px;
    top: 10px;
    width: 55px;
    height: 56px;
    transform: rotate(-45deg) scale(1.9, 1.02);
    z-index: 0;
    border-radius: 15px;
    border-top: 4px solid;
  }
`;

const StyledNyamushkaPackHead = styled.div`
  color: ${props => props.color ? packsColors.pallete[props.color].hovered : '#666666'};
  font-size: 16px;
  margin-bottom: 3px;
`;

const StyledNyamushkaPackCatBg = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
`;

const StyledNyamushkaPackCat = styled.img`
  position: absolute;
  left: -27px;
  bottom: -93px;
  height: 360px;
`;


const StyledNyamushkaPackInnerContentText = styled.div`
 padding: 20px 10px 20px 00px;
 margin-top: -36px;
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

const StyledNyamushkaPackInnerContent = styled.div`
  position: relative;
  z-index: 4;
  width: 100%;
  height: 100%;
  flex: 1;
  border: 4px solid;
  border-top: 0;
  background: #ffffff;
  margin-top: -6px;
  border-radius: 0 0 12px 12px;
  cursor: pointer;
  padding-left: 50px;
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
  margin-bottom: 30px;
  max-width: 100%;
  margin: 0 40px 40px;
  font-family: 'Trebuchet MS';

  @media (max-width: 500px) {
    margin-left: 0;
    margin-right: 0;
  }

  ${StyledNyamushkaPack} {
    ${StyledNyamushkaPackInnerContent}, &:before,  &:after{
      border-color: ${props => packsColors.pallete[props.color].normal};
    }
  }
  ${StyledNyamushkaPackWeight}{
    background-color: ${props => packsColors.pallete[props.color].normal};
  }
  ${StyledNyamushkaUnderTextAction}{
    color:  ${props => packsColors.pallete[props.color].normal};
  }

  &.hoverable:hover {
    ${StyledNyamushkaPack} {
      ${StyledNyamushkaPackInnerContent}, &:before, &:after{
        border-color: ${props => packsColors.pallete[props.color].hovered};
      }
    }
    ${StyledNyamushkaPackWeight}{
      background-color: ${ props => packsColors.pallete[props.color].hovered};
    }
    ${StyledNyamushkaUnderTextAction}{
      color: ${ props => packsColors.pallete[props.color].hovered};
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
