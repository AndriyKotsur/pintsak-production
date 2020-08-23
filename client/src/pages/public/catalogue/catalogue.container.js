import React from 'react';
import useCatalogue from './catalogue.logic';
import Catalogue from './catalogue.page';

const CatalogueContext = React.createContext(null);

const CatalogueContainer = (props) => {
    return (
        <CatalogueContext.Provider value={useCatalogue()}>
            <Catalogue {...props} />
        </CatalogueContext.Provider>
    )
};

export default CatalogueContainer;