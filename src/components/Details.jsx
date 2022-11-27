import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import './Details.css'

const Details = ({
    allControls,
    childToParent,
    toastMsgDel,
    codeDetails,
    nameDetails,
    descDetails,
    goalDetails,
    freqDetails,
    riskDetails,
    cOwnerDetails,
    effecDetails
}) => {

    //Detalhes
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Delete
    const [showDel, setShowDel] = useState(false);
    const handleCloseDel = () => {
        setShowDel(false);
        handleShow();
    }
    const handleShowDel = () => {
        handleClose();
        setShowDel(true);
    }

    //Edit
    
    const[codeEdit, setCodeEdit] = useState()
    const[nameEdit, setNameEdit] = useState()
    const[descEdit, setDescEdit] = useState()
    const[goalEdit, setGoalEdit] = useState()
    const[freqEdit, setFreqEdit] = useState()
    const[riskEdit, setRiskEdit] = useState()
    const[cOwnerEdit, setCownerEdit] = useState()
    const[effecEdit, setEffecEdit] = useState()

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => {
        setShowEdit(false);
        handleShow();
    }
    const handleShowEdit = () => {
        handleClose();
        setShowEdit(true);
    }

    const controlEdit = async(e) => {
        e.preventDefault()

        console.log(freqEdit)

        const delControl = {
            code: codeDetails,
            name: nameDetails,
            description: descDetails,
            goal: goalDetails,
            frequency: freqDetails,
            risk: riskDetails,
            controlOwner: cOwnerDetails,
            effective: effecDetails
        } 

        const editControl = {
            code: typeof codeEdit === "undefined" ? codeDetails : codeEdit,
            name: typeof nameEdit === "undefined" ? nameDetails : nameEdit,
            description: typeof descEdit === "undefined" ? descDetails : descEdit,
            goal: typeof goalEdit === "undefined" ? goalDetails : goalEdit,
            frequency: typeof freqEdit === "undefined" ? freqDetails : freqEdit,
            risk: typeof riskEdit === "undefined" ? riskDetails : riskEdit,
            controlOwner: typeof cOwnerEdit === "undefined" ? cOwnerDetails : cOwnerEdit,
            effective: typeof effecEdit === "undefined" ? effecDetails : effecEdit
        }

        const sendDict = {
            toDelete: delControl,
            toAdd: editControl
        }

        const res = await fetch('https://apiInternalControls.luanfreire2.repl.co', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendDict),
        })
        console.log(res)
        setShowEdit(false);
        const updateListEdit = allControls.filter((code) => code.code !== codeDetails)
        updateListEdit.push(editControl)
        childToParent(updateListEdit)
        toastMsgDel(`Controle ${codeDetails} editado.`)
    }

    //Deletar controle

    const controlDel = async (e) => {

        e.preventDefault()

        const delControl = {
            code: codeDetails,
            name: nameDetails,
            description: descDetails,
            goal: goalDetails,
            frequency: freqDetails,
            risk: riskDetails,
            controlOwner: cOwnerDetails,
            effective: effecDetails
        }

        const res = await fetch('https://apiInternalControls.luanfreire2.repl.co', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(delControl),
        })
        console.log(res.json())
        setShowDel(false);
        const updateListDel = allControls.filter((code) => code.code !== codeDetails)
        childToParent(updateListDel)
        toastMsgDel(`Controle ${codeDetails} deletado.`)
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Detalhes
            </Button>

            {/* Details */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{codeDetails}</Modal.Title>
                    <div className='iconsDetails'>
                        <i class="bi bi-trash" onClick={handleShowDel}></i>
                        <i class="bi bi-pencil" onClick={handleShowEdit}></i>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <h5>Código do controle:
                        <span className="infodetails"> {codeDetails}</span>
                    </h5><br />
                    <h5>Nome do controle:
                        <span className="infodetails"> {nameDetails}</span>
                    </h5><br />
                    <h5>Descrição do controle:
                        <span className="infodetails"> {descDetails}</span>
                    </h5><br />
                    <h5>Objetivo do controle:
                        <span className="infodetails"> {goalDetails}</span>
                    </h5><br />
                    <h5>Frequência do controle:
                        <span className="infodetails"> {freqDetails}</span>
                    </h5><br />
                    <h5>Risco do controle:
                        <span className="infodetails"> {riskDetails}</span>
                    </h5><br />
                    <h5>Executante do controle:
                        <span className="infodetails"> {cOwnerDetails}</span>
                    </h5><br />
                    <h5>Efetividade do controle:
                        <span className="infodetails"> {effecDetails}</span>
                    </h5><br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit */}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editando o controle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <h6>Código do controle</h6>
                            <Form.Control
                                onChange={(e) => setCodeEdit(e.target.value)}
                                type="text"
                                placeholder="Ex: CTECH.11"
                                autoFocus
                                defaultValue={codeDetails}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <h6>Nome</h6>
                            <Form.Control
                                onChange={(e) => setNameEdit(e.target.value)}
                                type="text"
                                placeholder="Ex: Controle de concessão de acesso"
                                defaultValue={nameDetails}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <h6>Descrição</h6>
                            <Form.Control
                                onChange={(e) => setDescEdit(e.target.value)}
                                type="text"
                                placeholder="Digite aqui..."
                                defaultValue={descDetails}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <h6>Objetivo</h6>
                            <Form.Control
                                onChange={(e) => setGoalEdit(e.target.value)}
                                type="text"
                                placeholder="Digite aqui..."
                                defaultValue={goalDetails}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <h6>Frequência</h6>
                            <Form.Control
                                onChange={(e) => setFreqEdit(e.target.value)}
                                type="text"
                                placeholder="Digite aqui..."
                                defaultValue={freqDetails}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <h6>Risco</h6>
                            <Form.Control
                                onChange={(e) => setRiskEdit(e.target.value)}
                                type="text"
                                placeholder="Digite aqui..."
                                defaultValue={riskDetails}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                            <h6>Executante</h6>
                            <Form.Control
                                onChange={(e) => setCownerEdit(e.target.value)}
                                type="text"
                                placeholder="Digite aqui..."
                                defaultValue={cOwnerDetails}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <h6>Efetividade</h6>
                            <Form.Control
                                onChange={(e) => setEffecEdit(e.target.value)}
                                type="text"
                                placeholder="Digite aqui..."
                                defaultValue={effecDetails}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={controlEdit}>
                        Editar
                    </Button>
                </Modal.Footer>
            {/* Delete */}
            </Modal>
            <Modal show={showDel} onHide={handleCloseDel}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar controle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>Deseja realmente deletar o controle {codeDetails}?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDel}>
                        Fechar
                    </Button>
                    <Button variant="danger" onClick={controlDel}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Details