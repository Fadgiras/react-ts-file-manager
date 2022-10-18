import "@dataesr/react-dsfr";
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
        fetch(
            "http://127.0.0.1:8080/api/files")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    isLoaded : ! this.state.isLoaded
                });
            })
        }

    setFileList(){
        let fileList = this.state.items.map((file : any) => (<FileLine uuid={file.uuid} name={file.originalName} created={file.createdAt} />))
        return fileList
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
                    <button className="fr-btn fr-btn--lg fr-btn--icon-left">
                        Ajouter un fichier
                    </button>
                        <div className="div-scroll">
                            { this.state.isLoaded ? this.setFileList() : "Veuillez patienter..."}
                        </div>
                    </div>
                </div>
    }
}