package com.hyu.kobot.repository;

import com.hyu.kobot.domain.bot.Bot;
import com.hyu.kobot.domain.order.OrderHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {

    List<OrderHistory> findByBot(Bot bot);
}
