import { shade } from 'polished';
import styled from 'styled-components';

export const ContainerTable = styled.div`
  margin-top: 30px;
  height: 100%;
  max-height: 330px;
  overflow: hidden;
  overflow-y: auto;
`;

export const TableContent = styled.table`
  width: 100%;
  border-collapse: collapse;

  button.actionQtd {
    background-color: #3dab71;
    font-size: 12px;
    border: 0;
    margin-left: 15px;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    color: #ffffff;
    line-height: 25px;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, '#3dab71')};
    }

    & + button {
      margin-left: 8px;
      background-color: #c46362;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${shade(0.2, '#c46362')};
      }
    }
  }

  thead {
    background-color: #fff;
    border: 1px solid #cfd2d6;
    text-align: left;

    th.action {
      text-align: right;
    }

    tr {
      th {
        padding: 6px 10px;
        font-weight: 600;
        font-size: 15px;
      }
    }

    @media (max-width: 500px) {
      display: none;
    }
  }

  tbody {
    background-color: #fff;

    tr {
      border: 1px solid #cfd2d6;

      td {
        padding: 13px;

        @media (max-width: 500px) {
          display: block;
          width: 100%;
        }
      }

      td.btnAction {
        text-align: right;

        button {
          background-color: #3dab71;
          font-size: 14px;
          color: #fff;
          padding: 3px 8px;
          border-radius: 2px;
          border: 0;
          transition: background-color 0.2s;

          &:hover {
            background-color: ${shade(0.2, '#3dab71')};
          }

          & + button {
            margin-left: 5px;
            background-color: #c46362;

            &:hover {
              background-color: ${shade(0.2, '#c46362')};
            }
          }
        }
      }
    }
  }
`;
