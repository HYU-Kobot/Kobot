package com.hyu.kobot.ui.dto;

public class GuestMember extends AppMember{

    public GuestMember() {
        super(0L);
    }

    @Override
    public boolean isGuest() {
        return true;
    }
}
