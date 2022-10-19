import "@dataesr/react-dsfr";
import React from "react";
import { Component } from "react";
import FileLine from "./FileLine";

export default class FileList extends Component<any, any>{
    constructor(props: any){
        super(props)
        this.state = {
            items: [],
            isLoaded : false
          };
    }

    componentDidMount() {
        this.updateItems()
    }

    setLoad(value : boolean){
        this.setState({isLoaded : value})
    }

    updateItems(){
        fetch(
                "/api/files",
                {method : "GET"}
            )
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    isLoaded : true
                });
            }
        )
    }

    setFileList(){
        let fileList = this.state.items.map((file : any) => (<FileLine key={file.uuid} uuid={file.uuid} name={file.originalName} created={file.createdAt} loadFn = {this.setLoad.bind(this)} updateItems={this.updateItems.bind(this)} />))
        return fileList
    }

    handleClick = () => {
        document.getElementById("fileUp")?.click()
    }

    handleChange = (Event : { target : any; }) => {
        let FD = new FormData(Event.target);
        fetch("/api/fileUpload", {
            headers: new Headers({'content-type': 'multipart/form-data'}),
            method : "POST",
            body : FD
            
        })
        .then(() => this.setLoad(false))
        .then(() => this.updateItems())
    }

    render(){
        return  <div className="">
                    <header role="banner" className=" bouh fr-header">
                        <div className="fr-header__body">
                            <div className="fr-container">
                                <div className="fr-header__body-row">
                                    <div className="fr-header__brand fr-enlarge-link">
                                        <div className="fr-header__brand-top">
                                            <div className="fr-header__logo">
                                                <p className="fr-logo">
                                                    Ministères <br /> Sociaux
                                                </p>
                                            </div>
                                        </div>
                                        <div className="fr-header__service">
                                            <a href="/" title="Accueil - [À MODIFIER - Nom du site / service] - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)">
                                                <p className="fr-header__service-title">
                                                    TEST REACT
                                                </p>
                                            </a>
                                            <p className="fr-header__service-tagline">baseline - précisions sur l‘organisation</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="div-second">
                    <button 
                        className="fr-btn fr-btn--lg fr-btn--icon-left"
                        onClick={this.handleClick}
                    >
                        Ajouter un fichier
                    </button>
                    <input
                        id="fileUp"
                        type="file"
                        onChange={this.handleChange}
                        style={{display: 'none'}}
                    />
                        <div className="div-scroll">
                            { this.state.isLoaded ? this.setFileList() : "Veuillez patienter..."}
                        </div>
                    </div>
                </div>
    }
}