
    <?php include "header.php" ?>

    <main id="home">
        <section id="map-content">
            <div id="map"></div>
            <input type="text" id="location-input" class="form-control">
            <a id="btn-plus" class="anchor" href="#section-form"><span>+</span></a>
        </section>
        <section id="section-form">
            <div class="container">
                <div id="form-local">
                        <div class="section-header">
                            <h2 class="text-center"> Contribua com mais um local </h2>
                        </div>
                        <form id="formMap">
                            <div class="row">
                                <div class="col-md-8 box">
                                    <div class="form-group">
                                        <label>Local</label>
                                        <input type="text" class="form-control" id="inputPost" placeholder="Pode ser o nome de um local ou o endereço" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Titulo para o local</label>
                                        <input type="text" class="form-control" id="nome" placeholder="Se o local não for conhecido dê um nome a ele" required>
                                    </div>
                                    

                                    <input type="hidden" name="name" id="fakeLat" value="" />
                                    <input type="hidden" name="name" id="fakeLng" value="" />
                                    
                                    <div class="text-center">Informações sobre esse local</div>


                                    <div class="form-group">
                                      <label for="select-tipo">Escolha o tipo de local</label>
                                      <select class="form-control" id="select-tipo" required>
                                        <option >Escolha</option>
                                        <option value="1">Local com acessibilidade</option>
                                        <option value="2">Local com acesso dificultado ou incacessivel</option>
                                        <option value="3">Instituição de apoio a deficientes</option>
                                      </select>
                                    </div>
                                    
                                    <div id="acessibilidade">
                                        <div class="checkbox">
                                            <label><input type="checkbox" class="acesso" value="1">Rampa de acesso e calçada rebaixada</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" class="acesso" value="2">Banheiro Adaptado</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" class="acesso" value="3">Vagas de estacionamento para deficientes</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" class="acesso" value="4">Pisos táteis (pisos especiais percebíveis pelo tato) e de alerta para os portadores de deficiência visual</label>
                                        </div>
                                    </div>


                                    <div id="inacessibilidade">
                                        <div class="checkbox">
                                            <label><input type="checkbox" class="inacesso" value="8">Dificuldade de acesso na entrada para deficientes físicos</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" class="inacesso" value="7">Não possui adaptações</label>
                                        </div>
                                       
                                    </div>
                                    
                                    <div id="instituicao">
                                        <div class="checkbox">
                                            <label><input type="checkbox" class="instituicao" value="10">Apoio a deficientes Fisicos motores</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" class="instituicao" value="11">Apoio a deficientes visuais</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" class="instituicao" value="12">Apoio a deficientes auditivos</label>
                                        </div>
                                    </div>

                                     <div class="form-group">
                                        <label>Mais detalhes</label>
                                        <input type="text" class="form-control" id="descricao" placeholder="Diga algo a mais sobre o local">
                                    </div>
                                    <input type="button" id="btnSend" class="btn btn-primary center-block" value="Enviar" />
                                </div>
                            </div>
                            

                        </form>
                        <div class="alert alert-success" id="success">
                            <strong>Salvo com sucesso!</strong>
                        </div>
                        <div class="alert alert-danger" id="error">
                            <strong>Houve um erro!</strong>
                        </div>

                </div>
            </div>
        </section>
    </main>
    
    <?php include "footer.php" ?> 