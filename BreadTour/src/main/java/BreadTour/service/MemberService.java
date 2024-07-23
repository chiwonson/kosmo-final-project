package BreadTour.service;

import BreadTour.entity.Member;
import BreadTour.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    // 회원 생성
    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

}
