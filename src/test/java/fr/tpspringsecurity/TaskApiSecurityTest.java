package fr.tpspringsecurity;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TaskApiSecurityTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void toutesLesRoutesExigentEncoreUneAuthentification() throws Exception {
        mvc.perform(get("/api/public/info")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/tasks")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/admin/stats")).andExpect(status().isUnauthorized());
    }

    @Disabled("TODO exercice 3 : terminez UserConfig puis retirez @Disabled pour verifier vos comptes.")
    @Test
    void exercice3AliceEtBobPeuventSeConnecter() throws Exception {
        mvc.perform(get("/api/tasks").with(httpBasic("alice", "alice123")))
                .andExpect(status().isOk());
        mvc.perform(get("/api/tasks").with(httpBasic("bob", "bob123")))
                .andExpect(status().isOk());
        mvc.perform(get("/api/tasks").with(httpBasic("alice", "erreur")))
                .andExpect(status().isUnauthorized());
    }
}
