import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  color: #333;
  margin: 0;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export const Th = styled.th`
  padding: 12px 15px;
  text-align: left;
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  color: #495057;
  font-weight: 600;
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #dee2e6;
  color: #212529;
  
  &.description {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Tr = styled.tr`
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const CustomerInfo = styled.div`
  div {
    margin-bottom: 2px;
    font-size: 14px;
  }
  
  div:first-child {
    font-weight: 600;
  }
`;

export const StatusSelect = styled.select`
  background-color: ${props => props.color};
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
  
  option {
    background-color: white;
    color: #333;
  }
`;

export const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 12px;

  &:hover {
    background-color: #c82333;
  }
`;

export const NoBookings = styled.div`
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #6c757d;
  font-size: 18px;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-size: 18px;
`;

export const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 450px;
  max-width: 90%;

  h3 {
    margin-top: 0;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 15px;
  }
`;

export const StatusChangeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  
  span {
    color: #666;
    min-width: 120px;
  }
`;

export const StatusBadge = styled.span`
  background-color: ${props => props.color};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a6268;
  }
`;

export const ConfirmButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;

  &:hover {
    background-color: #218838;
  }
`;
