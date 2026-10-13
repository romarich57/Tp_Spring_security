package fr.tpspringsecurity;

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
    void sansAuthentificationTousLesEndpointsRestentProteges() throws Exception {
        mvc.perform(get("/api/public/info")).andExpect(status().isOk());
        mvc.perform(get("/api/tasks")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/admin/stats")).andExpect(status().isUnauthorized());
    }

    @Test
    void utilisateursDeclaresSontAuthentifies() throws Exception {
        mvc.perform(get("/api/tasks").with(httpBasic("alice", "alice123")))
                .andExpect(status().isOk());
        mvc.perform(get("/api/tasks").with(httpBasic("bob", "bob123")))
                .andExpect(status().isOk());
        mvc.perform(get("/api/tasks").with(httpBasic("alice", "mauvais")))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void politiqueAdminAppliquee() throws Exception {
        mvc.perform(get("/api/admin/stats").with(httpBasic("alice", "alice123")))
                .andExpect(status().isForbidden());
        mvc.perform(get("/api/admin/stats").with(httpBasic("bob", "bob123")))
                .andExpect(status().isOk());
    }

}
