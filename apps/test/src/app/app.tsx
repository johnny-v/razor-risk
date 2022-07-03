import {Button, Forms, Menu, Modal, Row, Table, useClickOutsideComponent} from '@razor-risk/ui';
import {useRef, useState} from 'react';
import useStore from './store/store';
import {ModalType, Option} from './app.model';

export function App() {
  const columns = useStore((state) => state.columns);
  const trades = useStore((state) => state.rows);
  const options = useStore((state) => state.options);
  const title = useStore((state) => state.title);
  const forms = useStore((state) => state.forms);
  const formatters = useStore((state) => state.formatters);
  const addTrade = useStore((state) => state.addTrade);
  const updateTrade = useStore((state) => state.updateTrade);
  const deleteTrade = useStore((state) => state.deleteTrade);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(ModalType.Create);
  const [contextMenuData, setContextMenuData] = useState({ show: false, event: {}, data: {} });
  const [transientData, setTransientData] = useState(null);

  const formRef = useRef(null);
  const wrapperRef = useRef(null);
  useClickOutsideComponent(wrapperRef, () => setContextMenuData({show: false, event: {}, data: {}}));

  const selectMenuItem = (e: any, row: any) => {
    setContextMenuData({show: false, event: {}, data: {}});
    if (e === Option.Amend) {
      setModalType(ModalType.Amend);
      setShowModal(true);
      setTransientData(row);
    } else {
      deleteTrade(row.tradeId);
    }
  }

  const newTrade = () => {
    setTransientData(null);
    setModalType(ModalType.Create);
    setShowModal(true);
  }

  const saveTrade = () => {
    const trade = {
      tradeId: trades.length > 0 ? Number(trades[trades.length - 1]['tradeId']) + 1 : 1,
      securityCode: (formRef.current as any)?.elements.securityCode.value,
      tradePrice: (formRef.current as any)?.elements.tradePrice.value,
      tradeVolume: (formRef.current as any)?.elements.tradeVolume.value,
      tradeOwner: (formRef.current as any)?.elements.tradeOwner.value,
    };

    addTrade(trade);
    setShowModal(false);
  }

  const amendTrade = () => {
    if (transientData && transientData['tradeId']) {
      const trade = {
        tradeId: transientData['tradeId'],
        securityCode: (formRef.current as any)?.elements.securityCode.value,
        tradePrice: (formRef.current as any)?.elements.tradePrice.value,
        tradeVolume: (formRef.current as any)?.elements.tradeVolume.value,
        tradeOwner: (formRef.current as any)?.elements.tradeOwner.value,
      }

      updateTrade(trade);
      setShowModal(false);
    }
  }

  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto">
          <Button btnClick={newTrade}
                  classList='rounded float-right text-white shadow rounded hover:shadow-lg bg-sky-400 active:bg-sky-600'>
            +
          </Button>
          <div ref={wrapperRef}>
            <Table contextMenuToggle={(show: boolean, event: any, data: Row) => setContextMenuData({show, event, data})}
                   title={title}
                   formatters={formatters}
                   columns={columns}
                   rows={trades}/>
            <Menu  options={options}
                   context={contextMenuData}
                   onSelection={selectMenuItem}/>
          </div>

        </div>
      </div>
      <Modal onSave={modalType === ModalType.Create ? saveTrade : amendTrade}
             title={modalType === ModalType.Create ? 'Create New Trade' : 'Amend Existing Trade'}
             show={showModal}
             onClose={() => setShowModal(false)}>
        <Forms elRef={formRef} controls={forms} data={transientData} formatters={formatters}/>
      </Modal>
    </>
  );
}

export default App;
