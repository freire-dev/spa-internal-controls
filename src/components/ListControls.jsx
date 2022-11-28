//CSS
import './ListControls.css'
//react
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useEffect, useState } from 'react';
//Components
import Loading from './Loading';
import Details from './Details';

const ListControls = () => {

    const [controls, setControls] = useState([])
    const [loading, setLoading] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState()
    const position = useState('bottom-end');

    //pegando um estado do componente filho para o pai. (de Details para ListControl)
    const childToParent = (updateListDel) => {
        setControls(updateListDel)
    }


    const toastMsgAdd = () => {
        setMessageToast(`Controle ${code.toUpperCase()} adicionado com sucesso.`)
        setShowToast(true)
        setTimeout(function () { setShowToast(false) }, 5000)
    }

    const toastMsgDel = (message) => {
        setMessageToast(message)
        setShowToast(true)
        setTimeout(function () { setShowToast(false) }, 5000)
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const resGET = await fetch('https://apiInternalControls.luanfreire2.repl.co');
            const dataGET = await resGET.json();
            setControls(dataGET);
            setLoading(false)
        }
        fetchData()
    }, [])

    //Barra de busca

    const [query, setQuery] = useState()

    const controlsFilter = typeof query === 'undefined' ?
         controls :
         controls.filter((control) => control.code.includes(query.toUpperCase()))

    //get de dados do forms
    const [code, setCode] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [goal, setGoal] = useState()
    const [frequency, setFrequency] = useState()
    const [risk, setRisk] = useState()
    const [controlOwner, setControlOwner] = useState()
    const [effective, setEffective] = useState()

    const postData = async (e) => {

        e.preventDefault()

        const newControl = {
            code: code.toUpperCase(),
            name,
            description,
            goal,
            frequency,
            risk,
            controlOwner,
            effective
        }

        const res = await fetch('https://apiInternalControls.luanfreire2.repl.co', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newControl),
        })
        console.log(res.json())
        handleClose();
        setControls((prevControl) => [...prevControl, newControl]);
        toastMsgAdd();
        setCode('')
        setName('')
        setDescription('')
        setGoal('')
        setFrequency('')
        setRisk('')
        setControlOwner('')
        setEffective('')
    }

    return (
        <div>
            <div className="navbar">
                <Button className='btn-addcontrol' onClick={handleShow}>
                    <i class="bi bi-plus-circle"></i> Adicionar controle
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionando o controle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form autocomplete="off">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <h6>Código do controle</h6>
                                <Form.Control
                                    onChange={(e) => setCode(e.target.value)}
                                    type="text"
                                    placeholder="Ex: CTECH.11"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <h6>Nome</h6>
                                <Form.Control
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Ex: Controle de concessão de acesso"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <h6>Descrição</h6>
                                <Form.Control
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    placeholder="Digite aqui..."
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                <h6>Objetivo</h6>
                                <Form.Control
                                    onChange={(e) => setGoal(e.target.value)}
                                    type="text"
                                    placeholder="Digite aqui..."
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                <h6>Frequência</h6>
                                <Form.Control
                                    onChange={(e) => setFrequency(e.target.value)}
                                    type="text"
                                    placeholder="Digite aqui..."
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                                <h6>Risco</h6>
                                <Form.Control
                                    onChange={(e) => setRisk(e.target.value)}
                                    type="text"
                                    placeholder="Digite aqui..."
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                                <h6>Executante</h6>
                                <Form.Control
                                    onChange={(e) => setControlOwner(e.target.value)}
                                    type="text"
                                    placeholder="Digite aqui..."
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                                <h6>Efetividade</h6>
                                <Form.Control
                                    onChange={(e) => setEffective(e.target.value)}
                                    type="text"
                                    placeholder="Digite aqui..."
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="success" onClick={postData}>
                            Adicionar
                        </Button>
                    </Modal.Footer>
                </Modal>
                {
                    showToast
                    &&
                    <ToastContainer className="p-3" position={position} containerPosition='fixed'>
                        <Toast className='toast'>
                            <Toast.Header className='toast-header' closeButton={false}>
                                <strong className="me-auto">SPA - Internal Controls</strong>
                                <small>Há alguns segundos...</small>
                            </Toast.Header>
                            <Toast.Body>{messageToast}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                }
                <div className='search-form-div'>
                    <div className='search-form'>
                        <Form onSubmit={(e) => e.preventDefault()} autocomplete="off" >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
                                <Form.Control
                                    onChange={(e) => setQuery(e.target.value)}
                                    value={query}
                                    type="text"
                                    placeholder="Pesquise o controle aqui..."
                                    className='input-sf'
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className='btn-search-form-div'>
                        <Button className='btn-search-form' variant="primary" type='submit'>
                            <i class="bi bi-search"></i>
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <ul className='card-list'>
                    {loading && <Loading />}
                    {controlsFilter.map((control) => (
                        <div className='card-control'>
                            <li key={control.code}>
                                <h1>{control.code}</h1>
                                <p>{control.name}</p>
                                <Details
                                    allControls={controls}
                                    childToParent={childToParent}
                                    toastMsgDel={toastMsgDel}
                                    codeDetails={control.code}
                                    nameDetails={control.name}
                                    descDetails={control.description}
                                    goalDetails={control.goal}
                                    freqDetails={control.frequency}
                                    riskDetails={control.risk}
                                    cOwnerDetails={control.controlOwner}
                                    effecDetails={control.effective}
                                />
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListControls