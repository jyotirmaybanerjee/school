import React from 'react'
import {shallow, mount} from 'enzyme';
import {Block} from '../Block';

describe('>>>BLOCK --- Shallow Render REACT COMPONENTS',()=> {
    let wrapper
     const output = 10

    beforeEach(()=>{
        wrapper = shallow(<Block count={output}/>)
    })

    it('+++ render the DUMB component', () => {
       expect(wrapper.length).toEqual(1)
    });
      
    it('+++ contains output', () => {
        expect(wrapper.find('div[id="block"]').prop('value')).toEqual(output + 1)
    });
      
    it('+++ contains h1', () => {
        expect(wrapper.find('div[id="block"] h1').length).toEqual(1)
    });
      
    it('+++ h1 contains text', () => {
        expect(wrapper.find('div[id="block"] h1').text()).toEqual('Block - '+output)
    });

});
