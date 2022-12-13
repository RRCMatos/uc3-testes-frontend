import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { CadastroService } from './cadastro.service';

import { Cadastro } from './cadastro.model';

describe('CadastroService', () => {
  let service: CadastroService;
  let httpServiceMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CadastroService);
    httpServiceMock = TestBed.inject(HttpTestingController);
  });

  it('Deve Ser Criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve Retornar uma Lista de Cadastro', ()=>{
    const cadastroExemplo = [
      {
        id: 1,
        usuario: 'teste1',
        senha: 'senha1'
      },
      {
        id: 2,
        usuario: 'teste2',
        senha: 'senha2'
      }
      
    ];

    service.read().subscribe(cadastros =>{
      expect(cadastros.length).toBe(2);
      expect(cadastros).toEqual(cadastroExemplo);
    })

    const req = httpServiceMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(cadastroExemplo);
  });

  it('Deve Criar um Cadastro', ()=>{
    const cadastroRequest: Cadastro = {
      id: 1,
      usuario:'teste1',
      senha:'senha1'
    };

    const cadastroResponse: Cadastro ={
      id: 1,
      usuario: 'teste1',
      senha: 'senha1'
    }

    service.create(cadastroRequest).subscribe(cadastro => {
      expect(cadastro.usuario).toEqual(cadastroRequest.usuario);
      expect(cadastro.senha).toEqual(cadastroRequest.senha);
      expect(cadastro.id).toEqual(1);
    })

    const req = httpServiceMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(cadastroResponse);
  });

  it('Deve Retornar um Cadastro', ()=>{
    const cadastroExemplo = {
        id: 1,
        usuario: 'teste1',
        senha: 'senha1'
      };
      let response;
    service.readById(1).subscribe(cadastro =>{
      expect(cadastro.id).toBe(1)
    })

    

    const req = httpServiceMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(cadastroExemplo);
  });

  it('Deve Atualizar um Cadastro', ()=>{
    
    const cadastroupdate: Cadastro = {
      usuario:'teste2',
      senha:'senha2'
    };

    const cadastroResponse: Cadastro ={
      id: 1,
      usuario: 'teste',
      senha: 'senha'
    }

    

    service.update(1, cadastroupdate).subscribe(cadastro => {
      expect(cadastro.usuario).toEqual(cadastroupdate.usuario);
      expect(cadastro.senha).toEqual(cadastroupdate.senha);
      
    })
    const req = httpServiceMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('PUT');
    req.flush(cadastroResponse);
  });

  it('Deve Excluir um Cadastro', ()=>{
    
    const request: Cadastro = {
      id: 1,
      usuario:'teste2',
      senha:'senha2'
    };

    const cadastroResponse: Cadastro ={
      id: 1,
      usuario: 'teste2',
      senha: 'senha2'
    }

    service.delete(1).subscribe(cadastro => {
      expect(cadastro.id).toBeFalse
      expect(cadastro.usuario).toBeFalse
      expect(cadastro.senha).toBeFalse
      
    })

    const req = httpServiceMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('DELETE');
    req.flush(cadastroResponse);
  });

});
